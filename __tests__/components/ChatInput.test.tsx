/** @jsx jsx */
import { jsx } from "@emotion/react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatInput from "@/components/ChatInput";

describe("ChatInput", () => {
  it("should render the input field and send button", () => {
    const onSendMock = jest.fn();
    render(<ChatInput onSend={onSendMock} isSend={false} />);
    const inputElement = screen.getByPlaceholderText("Ask something...");
    const buttonElement = screen.getByRole("button", { name: "send-message" });
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call onSend when send button is clicked", () => {
    const onSendMock = jest.fn();
    render(<ChatInput onSend={onSendMock} isSend={false} />);
    const inputElement = screen.getByPlaceholderText("Ask something...");
    const buttonElement = screen.getByRole("button", { name: "send-message" });
    fireEvent.change(inputElement, { target: { value: "Hello" } });
    fireEvent.click(buttonElement);
    expect(onSendMock).toHaveBeenCalledWith("Hello");
  });

  it("should not call onSend when input is empty and send button is clicked", () => {
    const onSendMock = jest.fn();
    render(<ChatInput onSend={onSendMock} isSend={false} />);
    const inputElement = screen.getByPlaceholderText("Ask something...");
    const buttonElement = screen.getByRole("button", { name: "send-message" });
    fireEvent.click(buttonElement);
    expect(onSendMock).not.toHaveBeenCalled();
  });

  it("should call onSend when enter key is pressed", () => {
    const onSendMock = jest.fn();
    render(<ChatInput onSend={onSendMock} isSend={false} />);
    const inputElement = screen.getByPlaceholderText("Ask something...");
    fireEvent.change(inputElement, { target: { value: "Hello" } });
    fireEvent.keyDown(inputElement, { key: "Enter", keyCode: 13 });
    expect(onSendMock).toHaveBeenCalledWith("Hello");
  });

  it("should not call onSend when shift+enter keys are pressed", () => {
    const onSendMock = jest.fn();
    render(<ChatInput onSend={onSendMock} isSend={false} />);
    const inputElement = screen.getByPlaceholderText("Ask something...");
    fireEvent.change(inputElement, { target: { value: "Hello" } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      keyCode: 13,
      shiftKey: true,
    });
    expect(onSendMock).not.toHaveBeenCalled();
  });
});
