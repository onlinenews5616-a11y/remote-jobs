export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const response = await fetch('https://remotive.com/api/remote-jobs?limit=100');
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    // Fallback to Arbeitnow
    try {
      const response = await fetch('https://www.arbeitnow.com/api/job-board-api');
      const data = await response.json();
      res.status(200).json({ jobs: data.data });
    } catch (err2) {
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
  }
}
