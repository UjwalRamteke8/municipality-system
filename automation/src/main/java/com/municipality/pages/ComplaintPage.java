package com.municipality.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;

/**
 * Complaint Page - Contains locators and methods for complaint filing
 * functionality
 */
public class ComplaintPage {

  private WebDriver driver;

  // Locators
  private By categoryDropdown = By.id("complaint-category");
  private By descriptionField = By.id("complaint-description");
  private By attachmentInput = By.id("file-upload");
  private By submitButton = By.xpath("//button[@type='submit' and contains(text(), 'Submit')]");
  private By successMessage = By.className("success-message");
  private By complaintIdField = By.id("complaint-id");

  // Constructor
  public ComplaintPage(WebDriver driver) {
    this.driver = driver;
  }

  // Page Actions
  /**
   * Select complaint category from dropdown
   */
  public void selectCategory(String category) {
    driver.findElement(categoryDropdown).click();
    driver.findElement(By.xpath("//option[text()='" + category + "']")).click();
  }

  /**
   * Enter complaint description
   */
  public void enterDescription(String description) {
    driver.findElement(descriptionField).sendKeys(description);
  }

  /**
   * Upload attachment file
   */
  public void uploadAttachment(String filePath) {
    driver.findElement(attachmentInput).sendKeys(filePath);
  }

  /**
   * Click submit button
   */
  public void clickSubmitButton() {
    driver.findElement(submitButton).click();
  }

  /**
   * File a complaint with all details
   */
  public void fileComplaint(String category, String description, String filePath) {
    selectCategory(category);
    enterDescription(description);
    if (filePath != null && !filePath.isEmpty()) {
      uploadAttachment(filePath);
    }
    clickSubmitButton();
  }

  /**
   * Get success message
   */
  public String getSuccessMessage() {
    return driver.findElement(successMessage).getText();
  }

  /**
   * Get generated complaint ID
   */
  public String getComplaintId() {
    return driver.findElement(complaintIdField).getText();
  }
}
