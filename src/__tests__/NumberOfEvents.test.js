import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test("render number of events", () => { 
        expect(NumberOfEventsWrapper.find(".number-of-events")).toHaveLength(1);
    });

    test("render number of events input", () => {
        expect(NumberOfEventsWrapper.find(".number-of-events-input")).toHaveLength(
        1
        );
    });

    test("render number of events label", () => {
        expect(NumberOfEventsWrapper.find(".number-of-events-label")).toHaveLength(
        1
        );
    });

    test("render number of events input correctly", () => {
        const numberOfEvents = NumberOfEventsWrapper.state("query");
        expect(NumberOfEventsWrapper.find(".number-of-events-input").prop("value")).toBe(
        numberOfEvents
        );
    });

    test("change state when input changes", () => {
        const eventObject = { target: { value: 10 } };
        NumberOfEventsWrapper.find(".number-of-events-input").simulate("change", eventObject);
        expect(NumberOfEventsWrapper.state("query")).toBe(10);
    });
    });