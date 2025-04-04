jest.setTimeout(10000);

// Cleanup any remaining handles
afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
}); 