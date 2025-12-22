package com.municipality.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;

/**
 * Dashboard Page - Contains locators and methods for dashboard functionality
 */
public class DashboardPage {

  private WebDriver driver;

  // Locators
  private By welcomeMessage = By.xpath("//h1[contains(text(), 'Welcome')]");
  private By userProfileButton = By.id("user-profile");
  private By logoutButton = By.xpath("//button[contains(text(), 'Logout')]");
  private By servicesSection = By.id("services-section");
  private By complaintButton = By.xpath("//button[contains(text(), 'File Complaint')]");

  // Constructor
  public DashboardPage(WebDriver driver) {
    this.driver = driver;
  }

  // Page Actions
  /**
   * Get welcome message text
   */
  public String getWelcomeMessage() {
    return driver.findElement(welcomeMessage).getText();
  }

  /**
   * Check if dashboard is loaded successfully
   */
  public boolean isDashboardLoaded() {
    try {
      return driver.findElement(welcomeMessage).isDisplayed();
    } catch (Exception e) {
      return false;
    }
  }

  /**
   * Click on user profile button
   */
  public void clickUserProfile() {
    driver.findElement(userProfileButton).click();
  }

  /**
   * Click on logout button
   */
  public void clickLogout() {
    driver.findElement(logoutButton).click();
  }

  /**
   * Click on File Complaint button
   */
  public void clickFileComplaint() {
    driver.findElement(complaintButton).click();
  }
}
