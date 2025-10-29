import asyncio
from playwright.async_api import async_playwright
import json
import time

async def test_builder_functionality():
    """Test builder page functionality with correct selectors"""
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()
        
        console_errors = []
        
        def handle_console(msg):
            if msg.type in ['error']:
                console_errors.append({
                    'type': msg.type,
                    'text': msg.text,
                    'location': msg.location
                })
                print(f"Console {msg.type}: {msg.text}")
        
        page.on('console', handle_console)
        
        try:
            print("Navigating to builder page...")
            await page.goto('http://localhost:8081/builder', wait_until='networkidle')
            await page.wait_for_timeout(3000)
            
            # Test form functionality with correct selectors
            print("Testing form functionality...")
            
            # Test Personal Information tab (should be active by default)
            personal_tab = page.locator('button:has-text("Personal")')
            personal_panel = page.locator('#personal-panel')
            
            personal_tab_exists = await personal_tab.count() > 0
            personal_panel_visible = await personal_panel.is_visible()
            
            print(f"Personal tab exists: {personal_tab_exists}")
            print(f"Personal panel visible: {personal_panel_visible}")
            
            # Test form inputs
            full_name_input = page.locator('#fullName')
            email_input = page.locator('#email')
            phone_input = page.locator('#phone')
            
            form_inputs_found = {
                'fullName': await full_name_input.count() > 0,
                'email': await email_input.count() > 0,
                'phone': await phone_input.count() > 0
            }
            
            print(f"Form inputs found: {form_inputs_found}")
            
            # Test filling out the form
            if await full_name_input.count() > 0:
                print("Testing form input functionality...")
                await full_name_input.fill("John Doe")
                await email_input.fill("john@example.com")
                await phone_input.fill("+1 (555) 123-4567")
                
                # Wait for any updates
                await page.wait_for_timeout(1000)
                
                # Check if values are retained
                name_value = await full_name_input.input_value()
                email_value = await email_input.input_value()
                
                print(f"Name input value: {name_value}")
                print(f"Email input value: {email_value}")
            
            # Test other tabs
            print("Testing other tabs...")
            
            experience_tab = page.locator('button:has-text("Experience")')
            education_tab = page.locator('button:has-text("Education")')
            summary_tab = page.locator('button:has-text("Summary")')
            
            tabs_found = {
                'experience': await experience_tab.count() > 0,
                'education': await education_tab.count() > 0,
                'summary': await summary_tab.count() > 0
            }
            
            print(f"Tabs found: {tabs_found}")
            
            # Test tab switching
            if await experience_tab.count() > 0:
                print("Testing tab switching...")
                await experience_tab.click()
                await page.wait_for_timeout(1000)
                
                # Check if experience panel is visible
                experience_panel = page.locator('[role="tabpanel"]:has-text("Experience"), #experience-panel')
                experience_panel_visible = await experience_panel.is_visible()
                print(f"Experience panel visible after click: {experience_panel_visible}")
            
            # Test preview area
            print("Testing preview area...")
            
            # Look for preview content
            preview_area = page.locator('.space-y-6:has-text("Live Preview"), .preview, [data-testid*="preview"]')
            preview_header = page.locator('h2:has-text("Live Preview")')
            
            preview_found = {
                'preview_area': await preview_area.count() > 0,
                'preview_header': await preview_header.count() > 0
            }
            
            print(f"Preview components found: {preview_found}")
            
            # Check if preview updates with form data
            if await preview_header.count() > 0:
                print("Testing preview updates...")
                
                # Look for the name in preview
                preview_content = page.locator('#cv-preview-content, .cv-preview-content')
                if await preview_content.count() > 0:
                    preview_text = await preview_content.text_content()
                    name_in_preview = "John Doe" in (preview_text or "")
                    print(f"Name appears in preview: {name_in_preview}")
                else:
                    print("Preview content area not found")
            
            # Test save functionality
            print("Testing save functionality...")
            
            save_button = page.locator('button:has-text("Save")')
            save_button_found = await save_button.count() > 0
            
            print(f"Save button found: {save_button_found}")
            
            if save_button_found:
                await save_button.click()
                await page.wait_for_timeout(2000)
                
                # Check for toast messages
                toast_messages = await page.locator('.sonner-toast, [data-sonner-toast], .toast').all()
                toast_texts = []
                for toast in toast_messages:
                    if await toast.is_visible():
                        text = await toast.text_content()
                        toast_texts.append(text)
                
                print(f"Toast messages after save: {toast_texts}")
            
            # Generate test report
            test_report = {
                'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
                'console_errors': console_errors,
                'form_functionality': {
                    'personal_tab_exists': personal_tab_exists,
                    'personal_panel_visible': personal_panel_visible,
                    'form_inputs_found': form_inputs_found,
                    'form_input_values': {
                        'name': locals().get('name_value', 'Not tested'),
                        'email': locals().get('email_value', 'Not tested')
                    }
                },
                'tab_functionality': {
                    'tabs_found': tabs_found,
                    'tab_switching_works': locals().get('experience_panel_visible', False)
                },
                'preview_functionality': {
                    'preview_found': preview_found,
                    'preview_updates': locals().get('name_in_preview', False)
                },
                'save_functionality': {
                    'save_button_found': save_button_found,
                    'toast_messages': locals().get('toast_texts', [])
                }
            }
            
            print("\n=== BUILDER FUNCTIONALITY TEST REPORT ===")
            print(json.dumps(test_report, indent=2))
            
            return test_report
            
        except Exception as e:
            print(f"Error during test: {str(e)}")
            return {
                'error': str(e),
                'console_errors': console_errors
            }
        
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(test_builder_functionality())