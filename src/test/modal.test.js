import { screen, render } from "@testing-library/react";
import Modal from "../components/Modal";

const renderModal = (props = { }) => (
  <Modal {...props}>Content</Modal>
);

describe("Modal", () => {
  it("should not crash", () => {
    expect(() => render(renderModal())).not.toThrow();
  });

  it("should render content when isVisible is true", () => {
    render(renderModal({ isVisible: true }));

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should not render content when isVisible is false", () => {
    render(renderModal({ isVisible: false }));

    expect(() => screen.getByText("Content")).toThrow();
  });
});
