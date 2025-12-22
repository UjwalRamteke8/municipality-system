package com.municipality.base;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.AfterTest;
import com.municipality.utils.ConfigReader;
import io.github.bonigarcia.wdm.WebDriverManager;

public class BaseClass {
    
    public static WebDriver driver;
    protected ConfigReader configReader;
    
    /**
     * Initialize WebDriver based on browser type from config
     */
    @BeforeTest
    public void setUp() {
        configReader = new ConfigReader();
        String browser = configReader.getBrowser();
        String appUrl = configReader.getApplicationUrl();
        
        // Initialize WebDriver based on browser
        switch (browser.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                driver = new ChromeDriver();
                break;
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                driver = new FirefoxDriver();
                break;
            case "edge":
                WebDriverManager.edgedriver().setup();
                driver = new EdgeDriver();
                break;
            default:
                WebDriverManager.chromedriver().setup();
                driver = new ChromeDriver();
        }
        
        // Set implicit wait and navigate to URL
        driver.manage().window().maximize();
        driver.get(appUrl);
    }
    
    /**
     * Close WebDriver after test execution
     */
    @AfterTest
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
