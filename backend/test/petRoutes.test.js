describe('Pets API', () => {
  test('GET /api/pets - should return empty array initially', async () => {
    const res = await request(app).get('/api/pets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
