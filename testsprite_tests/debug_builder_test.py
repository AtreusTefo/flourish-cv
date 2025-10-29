import asyncio
from playwright.async_api import async_playwright
import json
import time

async def debug_builder_page():
    """Debug builder page to identify specific rendering issues"""
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()
        
        # Collect all console messages
        console_messages = []
        
        def handle_console(msg):
            console_messages.append({
                'type': msg.type,
                'text': msg.text,
                'location': msg.location
            })
            print(f"Console {msg.type}: {msg.text}")
        
        page.on('console', handle_console)
        
        try:
            print("Navigating to builder page...")
            await page.goto('http://localhost:8081/builder', wait_until='networkidle')
            await page.wait_for_timeout(5000)  # Wait longer for components to load
            
            # Check if React components are mounted
            print("Checking React component mounting...")
            
            # Check for React DevTools or component markers
            react_root = await page.evaluate("""
                () => {
                    // Check if React is loaded
                    const reactVersion = window.React ? window.React.version : 'Not loaded';
                    
                    // Check for component containers
                    const containers = document.querySelectorAll('[data-reactroot], #root, .react-component');
                    
                    // Check for specific CV components
                    const cvForm = document.querySelector('.cv-form, [data-testid*="cv-form"]');
                    const cvPreview = document.querySelector('.cv-preview, [data-testid*="cv-preview"]');
                    const tabs = document.querySelector('.tabs, [role="tablist"]');
                    
                    // Get all elements with class names that might be CV-related
                    const allElements = Array.from(document.querySelectorAll('*')).map(el => ({
                        tagName: el.tagName,
                        className: el.className || '',
                        id: el.id || '',
                        textContent: el.textContent ? el.textContent.substring(0, 50) : ''
                    })).filter(el => 
                        (typeof el.className === 'string' && (
                            el.className.includes('cv') || 
                            el.className.includes('form') || 
                            el.className.includes('preview') ||
                            el.className.includes('tab')
                        )) ||
                        el.textContent.includes('Personal') ||
                        el.textContent.includes('Experience') ||
                        el.textContent.includes('Education')
                    );
                    
                    return {
                        reactVersion,
                        containerCount: containers.length,
                        cvFormFound: !!cvForm,
                        cvPreviewFound: !!cvPreview,
                        tabsFound: !!tabs,
                        relevantElements: allElements.slice(0, 20) // Limit to first 20
                    };
                }
            """)
            
            print(f"React analysis: {json.dumps(react_root, indent=2)}")
            
            # Check for specific error patterns
            print("Checking for error patterns...")
            
            # Look for error boundaries or error messages
            error_boundaries = await page.locator('[data-error-boundary], .error-boundary, .react-error').count()
            error_messages = await page.locator('.error, .text-red-500, [role="alert"]').all()
            
            error_texts = []
            for error in error_messages:
                if await error.is_visible():
                    text = await error.text_content()
                    error_texts.append(text)
            
            # Check network requests
            print("Checking network requests...")
            
            # Wait for any pending requests
            await page.wait_for_load_state('networkidle')
            
            # Check if components are in DOM but hidden
            hidden_components = await page.evaluate("""
                () => {
                    const elements = document.querySelectorAll('*');
                    const hiddenElements = [];
                    
                    elements.forEach(el => {
                        const style = window.getComputedStyle(el);
                        const className = el.className || '';
                        if ((style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') &&
                            (typeof className === 'string' && (className.includes('cv') || className.includes('form') || className.includes('preview')))) {
                            hiddenElements.push({
                                tagName: el.tagName,
                                className: className,
                                id: el.id || '',
                                display: style.display,
                                visibility: style.visibility,
                                opacity: style.opacity
                            });
                        }
                    });
                    
                    return hiddenElements;
                }
            """)
            
            # Take a screenshot for visual debugging
            await page.screenshot(path='builder_debug.png', full_page=True)
            
            # Generate debug report
            debug_report = {
                'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
                'console_messages': console_messages,
                'react_analysis': react_root,
                'error_boundaries_count': error_boundaries,
                'visible_errors': error_texts,
                'hidden_components': hidden_components,
                'screenshot_taken': True
            }
            
            print("\n=== BUILDER DEBUG REPORT ===")
            print(json.dumps(debug_report, indent=2))
            
            return debug_report
            
        except Exception as e:
            print(f"Error during debug: {str(e)}")
            return {
                'error': str(e),
                'console_messages': console_messages
            }
        
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(debug_builder_page())