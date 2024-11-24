import AboutLayout from "@/app/about/layout";
import AboutPage from "@/app/about/page";
import { render, screen } from "@testing-library/react";

describe("About Page", () => {
  it("render about page", () => {
    const page = render(
      <AboutLayout>
        <AboutPage />
      </AboutLayout>
    );
    expect(screen.getByTestId("title").textContent).toBe("About Page");
    expect(page).toMatchSnapshot();
  });
});
