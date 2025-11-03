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
        # -> Try to reload the page to see if templates load properly or check for alternative navigation to templates.
        await page.goto('http://localhost:8082/templates', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Select the 'Minimal Classic' template by clicking its 'Use' button to check real-time preview update.
        frame = context.pages[-1]
        # Click 'Use' button on Minimal Classic template to select it.
        elem = frame.locator('xpath=html/body/div/div[2]/section[2]/div/div/div[4]/div[2]/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Modify the 'Full Name' input field to trigger live preview update and verify the preview reflects the change.
        frame = context.pages[-1]
        # Change Full Name to 'Jane Smith' to trigger live preview update.
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[2]/fieldset/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Jane Smith')
        

        # -> Check for available customization options such as colors or fonts to customize the template styling and verify if preview updates accordingly.
        await page.mouse.wheel(0, 300)
        

        # -> Scroll down further or explore other tabs (Summary, Experience, Education) to find any available template styling customization options and verify if preview updates accordingly.
        await page.mouse.wheel(0, 300)
        

        # -> Click on the 'Summary' tab to check if there are any styling customization options or additional template settings available there.
        frame = context.pages[-1]
        # Click on the 'Summary' tab to explore additional options or styling customization.
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click on the 'Experience' tab to check for any styling customization options or additional template settings.
        frame = context.pages[-1]
        # Click on the 'Experience' tab to explore additional options or styling customization.
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div/button[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Add Experience' button to add experience details and verify if the live preview updates accordingly.
        frame = context.pages[-1]
        # Click 'Add Experience' button to add experience details.
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Fill in the 'Job Title' and 'Company' fields with sample data and verify the live preview updates accordingly.
        frame = context.pages[-1]
        # Input 'Software Engineer' into Job Title field.
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Software Engineer')
        

        frame = context.pages[-1]
        # Input 'Tech Corp' into Company field.
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/div[2]/input[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Tech Corp')
        

        # -> Click the 'Download PDF' button to test the PDF export functionality and verify if the exported PDF contains the resume content or is blank.
        frame = context.pages[-1]
        # Click 'Download PDF' button to test PDF export functionality.
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div[2]/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Minimal Classic').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Jane Smith').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Software Engineer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tech Corp').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Start - End').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Add Experience').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Download PDF').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    