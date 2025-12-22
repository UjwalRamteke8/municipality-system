package com.municipality.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.municipality.base.BaseClass;
import com.municipality.pages.LoginPage;
import com.municipality.pages.DashboardPage;

/**
 * Login Test - Test cases for login functionality
 */
public class LoginTest extends BaseClass {

  private LoginPage loginPage;
  private DashboardPage dashboardPage;

  /**
   * Test case 1: Valid login credentials
   */
  @Test(priority = 1, description = "Login with valid credentials")
  public void testValidLogin() {
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);

    // Get credentials from config
    String email = configReader.getTestEmail();
    String password = configReader.getTestPassword();

    // Perform login
    loginPage.login(email, password);

    // Wait for dashboard to load and verify
    try {
      Thread.sleep(2000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    // Assert dashboard is loaded
    Assert.assertTrue(dashboardPage.isDashboardLoaded(), "Dashboard should be displayed after login");
  }

  /**
   * Test case 2: Invalid password
   */
  @Test(priority = 2, description = "Login with invalid password")
  public void testInvalidPassword() {
    loginPage = new LoginPage(driver);

    String email = configReader.getTestEmail();

    // Attempt login with invalid password
    loginPage.login(email, "wrongpassword");

    // Verify error message is displayed
    Assert.assertTrue(loginPage.isErrorMessageDisplayed(), "Error message should be displayed");
    Assert.assertTrue(loginPage.getErrorMessage().contains("Invalid"), "Error message should contain 'Invalid'");
  }

  /**
   * Test case 3: Empty email field
   */
  @Test(priority = 3, description = "Login with empty email")
  public void testEmptyEmail() {
    loginPage = new LoginPage(driver);

    // Attempt login with empty email
    loginPage.login("", "password123");

    // Verify error message
    Assert.assertTrue(loginPage.isErrorMessageDisplayed(), "Error message should be displayed for empty email");
  }
}
