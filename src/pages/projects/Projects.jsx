import './projects.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { useProjectContext } from '../../hooks/useProjectContext'


import ProjectDetails from '../projects-details/ProjectDetails'

const Projects = () => {

  const {projects, dispatch} = useProjectContext()

  const [searchTerm, setSearchTerm] = useState('')

  const [filteredProjects, setFilteredProjects] = useState([])

  const baseURL = import.meta.env.VITE_API_BASE_URL


  useEffect(() => {
    const fetchProjects = async () => {
        try {
          const response = await axios.get(`${baseURL}/api/projects`)
          if (response.status === 200) {
            dispatch({ type: 'SET_PROJECTS', payload: response.data })
          }
        } catch (error) {
          console.error("Error fetching projects:", error)
        }
      }
    fetchProjects()
  }, [dispatch])

 
  useEffect(() => {
    
    if (projects) {
      const filteredData = projects.filter((project) => {
        return project.author_name.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setFilteredProjects(filteredData)
    }
  }, [searchTerm, projects])




  return (
    <div className='projects-page'>
      <div className='search-boarder'>
        <div className='search-container'>
                  <label htmlFor='search'>Search Creator:</label>
                  <input
                  type='text'
                  name='search'
                  id='search'
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  />
        </div>
      </div>
      <div className='projects'>
          {projects && filteredProjects.map((project) => {
            return (
                <ProjectDetails key={project._id} project={project}/>
            )
          })}
      </div>
    </div>
  )
}

export default Projects