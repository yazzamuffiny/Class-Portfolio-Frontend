import { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
//Import context here
import { useProjectContext } from '../../hooks/useProjectContext'

import './projectdetails.scss'

import { FaArrowRight } from "react-icons/fa";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";




const ProjectDetails = ({project}) => {

    const baseURL = import.meta.env.VITE_API_BASE_URL

    const [isEditing, setIsEditing] = useState(false)

    const [editTitle, setEditTitle] = useState(project.project_name)
    const [editAuthor, setEditAuthor] = useState(project.author_name)

    const {dispatch} = useProjectContext()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))
    const user_id = user ? user.username : null;

    //handle navigate
    const handleNavigate = () => {
        let path = `/${project._id}`
        navigate(path)

    }

    //handle delete
    const handleDelete = async () => {
        const response = await axios.delete(`${baseURL}/api/projects/${project._id}`)
        const json = await response.data
        if(response.status === 200) {
            dispatch({type: 'DELETE_PROJECTS', payload: json})
        }
    }

    //handle edit
    const handleEdit = () => {
        setIsEditing(true);
    }

    //handle submit edit
    const handleSubmitEdit = async () => {
        const updatedProject = {
            project_name: editTitle,
            author_name: editAuthor
        };
        try {
            const response = await axios.patch(`${baseURL}/api/projects/${project._id}`, updatedProject);
            const updatedData = response.data

            if (response.status === 200) {
                dispatch({type: 'UPDATE_PROJECT', payload: updatedData});
                setIsEditing(false)
            }
        } catch (error) {
            console.log("error updating workout", error)
        }
    };

    //handle cancel edit
    const handleCancelEdit = () => {
        setEditTitle(project.project_name)
        setEditAuthor(project.author_name)
        setIsEditing(false)
    }


  return (
    <div className='project-details'>
      {isEditing ? (
        <div className='edit-project'>
            <div className='edit-form'>
                <label>Edit Project Title:</label>
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />

                <label>Edit Project Author:</label>
                <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                />
                <div className='edit-buttons'>
                    <div className='edit-button-border'>
                        <button className='edit-button' onClick={handleSubmitEdit}> Save </button>
                    </div>
                    <div className='edit-button-border'>
                        <button className='edit-button'onClick={handleCancelEdit}> Cancel </button>
                    </div>
                </div>
                
            </div>
        </div>
      )
      : //if not editing
      (
        <>
            <div className='whole-card-border'>
                <div className='card'>
                    <div className='project-img-div'>
                        <img className='project-img' src={`${baseURL}/public/uploads/${project.project_img}`} alt="Project" />
                    </div>
                    <div className='card-info'>
                        <div className="project-header">
                        <h3 className='title-link' onClick={handleNavigate}>{project.project_name} </h3>
                        <FaArrowRight className='arrow' />
                        </div>
                        
                        <p><b>{project.author_name}</b></p>
                        <p>
                            Created&nbsp; 
                            {formatDistanceToNow(new Date(project.createdAt), {
                            includeSeconds: true,
                            })}{' '}
                            ago
                        </p>
                    </div>
                    <div className='project-profile-avatar'>
                        <span>{project.author_name.charAt(0).toUpperCase()}</span> 

                    </div>

                    {project.author_name === user_id &&(
                        <>
                            <MdEdit className='edit'onClick={handleEdit}/>
                            <MdDelete className='delete'onClick={handleDelete}/>
                        </>
                     )  
                    }

                </div>
            </div>
        
        </>
      )
    }
    </div>
  )
}

export default ProjectDetails