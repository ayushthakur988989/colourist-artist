import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.join(__dirname, '../data/projects.json')

export function getProjects(req, res, next) {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8')
    const projects = JSON.parse(data)
    
    const { category } = req.query
    if (category && category !== 'ALL') {
      const filtered = projects.filter(
        (p) => p.category.toUpperCase() === category.toUpperCase()
      )
      return res.json({ success: true, count: filtered.length, data: filtered })
    }

    res.json({ success: true, count: projects.length, data: projects })
  } catch (error) {
    next(error)
  }
}

export function getProjectById(req, res, next) {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8')
    const projects = JSON.parse(data)
    const project = projects.find((p) => p.id === parseInt(req.params.id, 10))

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' })
    }

    res.json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}
