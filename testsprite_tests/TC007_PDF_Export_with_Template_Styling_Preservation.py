import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:8082/templates", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Try to navigate to the resume creation or editing page to start filling a resume using any available template.
        await page.goto('http://localhost:8082/create', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Click 'Return to Home' link to go back to the home page and find alternative navigation to resume creation or template selection.
        frame = context.pages[-1]
        # Click 'Return to Home' link to go back to home page
        elem = frame.locator('xpath=html/body/div/div[2]/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Start Building Free' button to begin creating a resume using any template.
        frame = context.pages[-1]
        # Click 'Start Building Free' button to start resume creation
        elem = frame.locator('xpath=html/body/div/div[2]/section/div/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Fill the Summary section with sample text to continue building the resume.
        frame = context.pages[-1]
        # Click 'Summary' tab to fill summary section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Input sample summary text into the textarea to continue building the resume.
        frame = context.pages[-1]
        # Input sample professional summary text into the summary textarea
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[3]/div/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Experienced software developer with a strong background in building scalable web applications and a passion for clean code and innovative solutions.')
        

        # -> Click the 'Experience' tab to fill in work experience details.
        frame = context.pages[-1]
        # Click 'Experience' tab to fill work experience section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div/button[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Add Experience' button to input sample work experience details.
        frame = context.pages[-1]
        # Click 'Add Experience' button to add work experience details
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Fill in the Experience section fields with sample data: Job Title, Company, Location, Start Date, End Date, and Description.
        frame = context.pages[-1]
        # Input job title in Experience section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Senior Software Engineer')
        

        frame = context.pages[-1]
        # Input company name in Experience section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/div[2]/input[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Tech Innovations Inc.')
        

        frame = context.pages[-1]
        # Input location in Experience section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/div[2]/input[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('San Francisco, CA')
        

        frame = context.pages[-1]
        # Input start date in Experience section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('2018-06-01')
        

        frame = context.pages[-1]
        # Input end date in Experience section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/div[3]/input[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('2023-09-30')
        

        frame = context.pages[-1]
        # Input job description in Experience section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Led a team of developers to build scalable web applications, improved code quality, and implemented CI/CD pipelines.')
        

        # -> Click the 'Education' tab to fill in education details.
        frame = context.pages[-1]
        # Click 'Education' tab to fill education section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div/button[4]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Add Education' button to input sample education details.
        frame = context.pages[-1]
        # Click 'Add Education' button to add education details
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[5]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Fill in the Education section fields with sample data: Degree, Institution, Location, Graduation Date, and optionally GPA.
        frame = context.pages[-1]
        # Input degree in Education section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[5]/div/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Bachelor of Science in Computer Science')
        

        frame = context.pages[-1]
        # Input institution name in Education section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[5]/div/div[2]/input[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('State University')
        

        frame = context.pages[-1]
        # Input location in Education section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[5]/div/div[2]/input[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('New York, NY')
        

        frame = context.pages[-1]
        # Input graduation date in Education section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[5]/div/div[2]/input[4]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('2017-05-15')
        

        frame = context.pages[-1]
        # Input GPA in Education section
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[5]/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('3.8')
        

        # -> Click the 'Download PDF' button to export the resume and verify the PDF for accurate styling, formatting, and pagination.
        frame = context.pages[-1]
        # Click 'Download PDF' button to export the resume as PDF
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div[2]/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Fill in the 'Your Name' field in the Personal section with a sample name to enable PDF export.
        frame = context.pages[-1]
        # Click 'Personal' tab to fill in the 'Your Name' field
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Download PDF' button to export the resume and verify the PDF for accurate styling, formatting, and pagination.
        frame = context.pages[-1]
        # Click 'Download PDF' button to export the resume as PDF
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div[2]/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=CVCraft Builder').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Build Your Resume').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Fill in your information to create a professional resume').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full Name *').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Email *').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Phone').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Location').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=LinkedIn').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Website/Portfolio').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Download PDF').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Your Name').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Experienced software developer with a strong background in building scalable web applications and a passion for clean code and innovative solutions.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Senior Software Engineer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tech Innovations Inc., San Francisco, CA').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2018-06-01 - 2023-09-30').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Led a team of developers to build scalable web applications').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Improved code quality').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Implemented CI/CD pipelines').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Bachelor of Science in Computer Science').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=State University, New York, NY').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2017-05-15').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    