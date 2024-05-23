import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils";
import App from "../App";

it("display movie preview modal", async () => {
  renderWithProviders(<App />);

  const viewMovieTrailerButton = screen.getByTestId("view-trailer");

  await waitFor(() => {
    expect(viewMovieTrailerButton).toBeInTheDocument();
  });

  await userEvent.click(viewMovieTrailerButton);

  await waitFor(() => {
    expect(screen.getByTestId("preview-modal")).toBeInTheDocument();
  });
});
