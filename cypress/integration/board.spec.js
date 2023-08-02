/// <reference types="cypress" />

/* eslint-disable no-undef */

describe("board dashboard", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add a new coloumn and create new cards and add them into the columns, update the card content, and a drag card from To Do to In Progress then to Done to new column", () => {
    // Adding new Analysis Column
    cy.contains("+ Add another list").click();
    cy.get("[placeholder='List title']").type("Analysis");
    cy.contains("Add list").click();
    cy.get('[data-cy="column-component"]').should("have.length", 4);

    // Adding four Cards in To Do Column
    cy.get("[data-cy='column-component']")
      .eq(0)
      .within(() => {
        cy.contains("+ Add Card").click();
        cy.get("[placeholder='Add Card description']").type("Task1");
        cy.contains("Add Card").click();

        cy.contains("+ Add Card").click();
        cy.get("[placeholder='Add Card description']").type("Task2");
        cy.contains("Add Card").click();

        cy.contains("+ Add Card").click();
        cy.get("[placeholder='Add Card description']").type("Task3");
        cy.contains("Add Card").click();

        cy.contains("+ Add Card").click();
        cy.get("[placeholder='Add Card description']").type(
          "This card will be deleted"
        );
        cy.contains("Add Card").click();
      });

    // updating First Card Content
    cy.get("[data-cy='column-component']")
      .eq(0)
      .within(() => {
        cy.get("[data-cy='card-component']")
          .eq(0)
          .within(() => {
            cy.contains("Edit").click();
            cy.get("textarea").type(" Updated");
            cy.contains("Save").click();
          });
      });

    cy.get("[data-cy='column-component']").eq(1).as("inProgressColumn");

    const dataTransfer = new DataTransfer();

    // Moved Task1 Card to In progress Column
    cy.get("[data-cy='column-component']")
      .eq(0)
      .get("[data-cy='card-component']")
      .contains("Task1")
      .trigger("dragstart", { dataTransfer });
    cy.get("@inProgressColumn").trigger("drop", { dataTransfer });

    // Moved Task2 Card to In progress Column
    cy.get("[data-cy='column-component']")
      .eq(0)
      .get("[data-cy='card-component']")
      .contains("Task2")
      .trigger("dragstart", { dataTransfer });
    cy.get("@inProgressColumn").trigger("drop", { dataTransfer });

    cy.get("[data-cy='column-component']")
      .eq(1)
      .contains("Task1")
      .should("exist");

    // Moved Task1 Card from In Progress Column to Done Column
    cy.get("[data-cy='column-component']").eq(2).as("DoneColumn");
    cy.get("[data-cy='column-component']")
      .eq(1)
      .within(() => {
        cy.get("[data-cy='card-component']")
          .contains("Task1")
          .trigger("dragstart", { dataTransfer });
      });
    cy.get("@DoneColumn").trigger("drop", { dataTransfer });

    cy.get("[data-cy='column-component']")
      .eq(2)
      .contains("Task1")
      .should("exist");

    // Moved Task1 Card from Done Column to Analysis Column
    cy.get("[data-cy='column-component']").eq(3).as("AnalysisColumn");
    cy.get("[data-cy='column-component']")
      .eq(2)
      .within(() => {
        cy.get("[data-cy='card-component']")
          .contains("Task")
          .trigger("dragstart", { dataTransfer });
      });

    cy.get("@AnalysisColumn").trigger("drop", { dataTransfer });

    cy.get("[data-cy='column-component']")
      .eq(3)
      .contains("Task1")
      .should("exist");

    //Deleted the last Card in To Do Column
    cy.get("[data-cy='column-component']")
      .eq(0)
      .within(() => {
        cy.get("[data-cy='card-component']")
          .last()
          .within(() => {
            cy.contains("Delete").click();
          });
      });
  });
});
