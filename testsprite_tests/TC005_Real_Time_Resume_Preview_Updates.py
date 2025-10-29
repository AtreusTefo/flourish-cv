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
        await page.goto("http://localhost:8081", wait_until="commit", timeout=10000)
        
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
        # -> Locate and navigate to the Resume Builder page or section with form fields to start filling personal info.
        await page.mouse.wheel(0, 300)
        

        # -> Try to reload the page or open a new tab to find the Resume Builder page or form fields.
        await page.goto('http://localhost:8081/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Click the 'Start Building Free' button to navigate to the Resume Builder form page.
        frame = context.pages[-1]
        # Click the 'Start Building Free' button to go to the Resume Builder form page
        elem = frame.locator('xpath=html/body/div/div[2]/section/div/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Modify the 'Full Name' field to a new value and check if the live preview updates instantly.
        frame = context.pages[-1]
        # Change Full Name field to 'Jane Smith' to test live preview update
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[2]/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Jane Smith')
        

        # -> Switch to the Experience tab, add a new work experience entry, fill in details, and verify the live preview updates accordingly.
        frame = context.pages[-1]
        # Click the 'Experience' tab to switch to work experience form fields
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div/button[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the '+ Add Experience' button to add a new work experience entry.
        frame = context.pages[-1]
        # Click '+ Add Experience' button to add a new work experience entry
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Fill in the 'Job Title' field with 'Software Engineer' and verify the live preview updates instantly.
        frame = context.pages[-1]
        # Fill in Job Title field with 'Software Engineer' to test live preview update
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Software Engineer')
        

        # -> Fill in the 'Company' field with 'Tech Corp' and verify the live preview updates instantly.
        frame = context.pages[-1]
        # Fill in Company field with 'Tech Corp' to test live preview update
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Tech Corp')
        

        # -> Fill in the 'Start Date' field with '2023-01-01' and verify the live preview updates instantly.
        frame = context.pages[-1]
        # Fill in Start Date field with '2023-01-01' to test live preview update
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/div[4]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('2023-01-01')
        

        # -> Fill in the 'End Date' field with '2024-01-01' and verify the live preview updates instantly.
        frame = context.pages[-1]
        # Fill in End Date field with '2024-01-01' to test live preview update
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/div[4]/input[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('2024-01-01')
        

        # -> Fill in the 'Description' textarea with 'Developed and maintained web applications.' and verify the live preview updates instantly.
        frame = context.pages[-1]
        # Fill in Description field to test live preview update
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[4]/div/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Developed and maintained web applications.')
        

        # -> Click the 'Summary' tab to switch to the summary form fields and verify live preview updates.
        frame = context.pages[-1]
        # Click the 'Summary' tab to switch to summary form fields
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Input a brief professional summary text into the textarea and verify the live preview updates instantly.
        frame = context.pages[-1]
        # Input professional summary text to test live preview update
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div[3]/div/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Experienced software engineer with a strong background in web development and project management.')
        

        # -> Click the 'Education' tab to switch to the education form fields and verify live preview updates.
        frame = context.pages[-1]
        # Click the 'Education' tab to switch to education form fields
        elem = frame.locator('xpath=html/body/div/div[2]/div/div/div/div/div[2]/div/button[4]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Jane Smith').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Experienced software engineer with a strong background in web development and project management.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Software Engineer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tech Corp').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023-01-01 - 2024-01-01').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Developed and maintained web applications.').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    