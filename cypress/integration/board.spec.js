/// <reference types="cypress" />

/* eslint-disable no-undef */

describe("board dashboard", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add a new coloumn and create new cards and add them into the columns and a drag card from To Do to In Progress then to Done to new column", () => {
    cy.contains("+ Add another list").click();
    cy.get("[placeholder='List title']").type("Analysis");
    cy.contains("Add list").click();
    cy.get('[data-cy="column-component"]').should("have.length", 4);

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
        cy.get("[placeholder='Add Card description']").type("Task4");
        cy.contains("Add Card").click();
      });

    cy.get("[data-cy='column-component']")
      .eq(0)
      .contains("Task1")
      .should("exist");

    cy.get("[data-cy='column-component']").eq(1).as("inProgressColumn");

    const dataTransfer = new DataTransfer();

    cy.get("[data-cy='column-component']")
      .eq(0)
      .get("[data-cy='card-component']")
      .contains("Task1")
      .trigger("dragstart", { dataTransfer });

    cy.get("@inProgressColumn").trigger("drop", { dataTransfer });

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
  });
});
