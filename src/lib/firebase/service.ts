import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function register(
  data: {
    fullname: string;
    email: string;
    password: string;
    role?: string;
  }
  // callback: (result: { status: boolean; message: string }) => void
): Promise<{ status: boolean; statusCode: number; message: string }> {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: "Email already exist",
    };
  } else {
    data.role = "member";
    data.password = await bcrypt.hash(data.password, 10);

    try {
      await addDoc(collection(firestore, "users"), data);
      return {
        status: true,
        statusCode: 200,
        message: "Registrasi sukses",
      };
    } catch (error) {
      return {
        status: false,
        statusCode: 400,
        message: "Registrasi gagal! " + error,
      };
    }
  }
}

export async function login(data: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users) {
    return users[0];
  } else {
    return null;
    // return {
    //   status: false,
    //   statusCode: 400,
    //   message: "Email not registered",
    // };
  }
}

export async function loginWithGoogle(data: any, callback: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { role: string }),
  }));

  if (user.length > 0) {
    data.role = user[0].role
    await updateDoc(doc(firestore, "users", user[0].id), data).then(() => {
      // return data;
      callback({ status: true, data });
    });
  } else { 
    data.role = "admin";
    await addDoc(collection(firestore, "users"), data).then(() => { 
      callback({ status: true, data });
      // return data;
    })
  }


}
