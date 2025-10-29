#!/usr/bin/env python3

import asyncio
from playwright.async_api import async_playwright
import json

async def test_save_functionality():
    """Test that save functionality shows toast messages"""
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()
        
        # Set viewport to desktop size to ensure desktop save button is visible
        await page.set_viewport_size({"width": 1280, "height": 720})
        
        console_messages = []
        
        def handle_console(msg):
            console_messages.append({
                'type': msg.type,
                'text': msg.text,
                'timestamp': time.strftime("%H:%M:%S")
            })
            print(f"Console {msg.type}: {msg.text}")
        
        page.on('console', handle_console)
        
        print("Step 1: Navigate to builder page...")
        await page.goto("http://localhost:8081/builder")
        await page.wait_for_load_state("networkidle")
        
        print("Step 2: Fill out some form data...")
        # Wait for the form to be ready
        await page.wait_for_selector('#fullName', timeout=10000)
        
        # Fill in personal information using correct IDs
        await page.fill('#fullName', "John Doe")
        await page.fill('#email', "john@example.com")
        await page.fill('#phone', "123-456-7890")
        await page.fill('#location', "New York, NY")
        
        print("Step 3: Look for save button...")
        # Try to find the save button (desktop version first, then mobile)
        save_button = None
        try:
            save_button = await page.wait_for_selector('button:has-text("Save Resume")', timeout=5000)
            print("Found desktop save button")
        except:
            try:
                # Try mobile save button (just the Save icon)
                save_button = await page.wait_for_selector('button[class*="sm:hidden"] svg[class*="h-4 w-4"]', timeout=5000)
                print("Found mobile save button")
            except:
                print("Could not find save button, checking page content...")
                # Print page content for debugging
                content = await page.content()
                if "Save Resume" in content:
                    print("'Save Resume' text found in page content")
                else:
                    print("'Save Resume' text NOT found in page content")
                
                # Try to find any button with Save text or icon
                all_buttons = await page.locator('button').all()
                print(f"Found {len(all_buttons)} buttons on page")
                for i, button in enumerate(all_buttons):
                    text = await button.text_content()
                    print(f"Button {i}: '{text}'")
        
        if save_button:
            print("Step 4: Click save button...")
            await save_button.click()
        
            
            print("Step 5: Wait for response...")
            # Wait for toast messages or success indicators
            await page.wait_for_timeout(3000)  # Wait 3 seconds for toast to appear
            
            # Check for toast messages (Sonner toast library)
            toast_messages = await page.locator('[data-sonner-toast]').all()
            success_elements = await page.locator('.toast-success, [data-testid="success-toast"]').all()
            
            # Also check for any elements containing success text
            success_text_elements = await page.locator('text=/saved|success|created/i').all()
            
            print(f"Found {len(toast_messages)} toast messages")
            print(f"Found {len(success_elements)} success elements")
            print(f"Found {len(success_text_elements)} success text elements")
            
            # Check if save was successful
            if len(toast_messages) > 0 or len(success_elements) > 0 or len(success_text_elements) > 0:
                print("✅ Save functionality appears to be working - success indicators detected")
            else:
                print("❌ No success indicators detected - save functionality may not be working")
        else:
            print("❌ Could not find save button - test cannot proceed")
            
        # Print console messages
        print("\nConsole messages:")
        for msg in console_messages:
            print(f"  {msg}")
        
        # Take a screenshot for visual verification
        await page.screenshot(path="save_test_result.png")
        print("Screenshot saved as save_test_result.png")
        
        await browser.close()

if __name__ == "__main__":
    import time
    asyncio.run(test_save_functionality())