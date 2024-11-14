import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Input from "../src/components/Input";

describe("Input Component", () => {
   test("Renders input Component", () => {
      render(<Input role="textbox" />);

      const input = screen.getByRole("textbox");

      expect(input).toBeInTheDocument();
   });

   test("Types value freely into input in uncontrolled state", async () => {
      render(<Input role="textbox" />);
      const input = screen.getByRole("textbox");

      await userEvent.type(input, "Testing");
      expect(input).toHaveValue("Testing");
   });

   test("Types value freely into input in controlled state with onChange event", async () => {
      const TestComponent = () => {
         const [value, setValue] = useState("");

         return (
            <Input
               value={value}
               role="textbox"
               onChange={(e) => setValue(e.target.value)}
            />
         );
      };

      render(<TestComponent />);
      const input = screen.getByRole("textbox") as HTMLInputElement;

      await userEvent.type(input, "Testing");
      expect(input).toHaveValue("Testing");
      expect(input.value).toEqual("Testing");
   });

   test("Cannot type value freely into input in controlled state without onChange event", async () => {
      const TestComponent = () => {
         const [value] = useState("");

         return (
            <Input
               value={value}
               role="textbox"
            />
         );
      };

      render(<TestComponent />);
      const input = screen.getByRole("textbox") as HTMLInputElement;

      await userEvent.type(input, "Testing");
      expect(input).not.toHaveValue("Testing");
      expect(input.value).toEqual("");
   });
});
