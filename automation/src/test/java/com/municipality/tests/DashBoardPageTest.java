package com.municipality.tests;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.municipality.base.BaseClass;
import com.municipality.pages.LoginPage;
import com.municipality.pages.DashboardPage;

/**
 * Dashboard Test - Validates UI elements and navigation on the Dashboard
 */
public class DashBoardPageTest extends BaseClass {

    private LoginPage loginPage;
    private DashboardPage dashboardPage;

    @BeforeMethod
    public void loginToApp() {
        loginPage = new LoginPage(driver);
        dashboardPage = new DashboardPage(driver);

        // Pre-condition: Must be logged in to test Dashboard
        loginPage.login(configReader.getTestEmail(), configReader.getTestPassword());
    }

    @Test(priority = 1, description = "Verify Dashboard UI elements are visible")
    public void testDashboardLoading() {
        Assert.assertTrue(dashboardPage.isDashboardLoaded(),
                "Dashboard Header was not found after login.");
    }

    @Test(priority = 2, description = "Verify navigation to File Complaint page")
    public void testNavigationToFileComplaint() {
        dashboardPage.clickFileComplaint();

        // Check if the URL changed to the complaint page
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("complaint"),
                "Did not navigate to Complaint page. Current URL: " + currentUrl);
    }
}