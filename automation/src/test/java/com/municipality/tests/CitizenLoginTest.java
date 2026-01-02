package com.municipality.tests;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
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

  @BeforeMethod
  public void setupPages() {
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
  }

  /**
   * Test case 1: Valid login credentials
   */
  @Test(priority = 1, description = "Login with valid credentials")
  public void testValidLogin() {

    String email = configReader.getTestEmail();
    String password = configReader.getTestPassword();

    loginPage.login(email, password);

    Assert.assertTrue(
            dashboardPage.isDashboardLoaded(),
            "Dashboard should be displayed after successful login"
    );
  }

  /**
   * Test case 2: Invalid password
   */
  @Test(priority = 2, description = "Login with invalid password")
  public void testInvalidPassword() {

    String email = configReader.getTestEmail();

    loginPage.login(email, "wrongpassword");

    // App does not show error message, so assert no navigation
    Assert.assertTrue(
            driver.getCurrentUrl().contains("login"),
            "User should remain on login page for invalid credentials"
    );
  }

  /**
   * Test case 3: Empty email field
   */
  @Test(priority = 3, description = "Login with empty email")
  public void testEmptyEmail() {

    loginPage.login("", "pass@123");

    // Browser / frontend validation prevents login
    Assert.assertTrue(
            driver.getCurrentUrl().contains("login"),
            "User should remain on login page when email is empty"
    );
  }
}
