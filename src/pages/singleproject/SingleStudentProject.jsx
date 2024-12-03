import {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './singlestudentproject.scss'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useProjectContext } from '../../hooks/useProjectContext'
import { FaGithub } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";


const SingleStudentProject = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const {projects, dispatch} = useProjectContext()

  const baseURL = import.meta.env.VITE_API_BASE_URL

  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))

  const githubProfile = user.github_profile;


  if (!projects) {
    return <p>Loading...</p>;
  }
  
  const project = projects.find(proj => proj._id === id);

  const handleAddComment = async () => {
    try {
        const response = await axios.post(
            `${baseURL}/api/comments/projects/${project._id}/comments`,
            {
                text: commentText,
                user_id: user.username,
            }
        );

        if (response.status === 201) {
            const newComment = response.data;
            const updatedComments = [...project.comments, newComment];
            const updatedProject = { ...project, comments: updatedComments };

            dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject });

            setCommentText('');
        }
    } catch (error) {
        console.error('Error Adding Comment: ', error);
    }
};

  return (
    <div className='single-page-project'>

      <div className='button-div'>
        <button className='back-button' onClick={()=>navigate(-1)}><IoMdArrowRoundBack /></button>
      </div>

      <div className='title'>
        <h2>{project.author_name}'s {project.project_name} Project</h2>
      </div>

      <div className='single-page-card'>

        <div className='left-overlay'>
          <img className='single-page-project-image' 
          src={`${baseURL}/public/uploads/${project.project_img}`} 
          alt={project.project_name} />

          <div className='profile-pic-overlay'>
            <div className='profile-avatar'>
              <span>{project.author_name.charAt(0).toUpperCase()}</span> 
            </div>
          </div>
        </div>
        
        <div className='right-overlay'>
          <h3>{project.project_name}</h3><br/>
          <p>{project.description}</p><br/>
          <h4>{project.author_name}</h4><br/>

          <div className='github-profile'>
          <p>Github Profile: <a href={project.github_profile} target="_blank" rel="noopener noreferrer">{project.github_profile}</a></p><br/>
          </div>

          <div className='socials'>

            <div className='icon-link-holder'>
              <a href={project.github_repo} target="_blank" rel="noopener noreferrer">
                <p className='social-icons'>
                  <FaGithub className='github'/>
                </p>
              </a>
              <a className='text-link' href={project.github_repo} target="_blank" rel="noopener noreferrer">
                <span className='link-title'>Github Repo</span>
              </a>
            </div>

            <div className='icon-link-holder'>
              <a className='text-link' href={project.vercel_link} target="_blank" rel="noopener noreferrer">
                <p className='social-icons'>
                <IoLogoVercel className='vercel' />
                </p>
              </a>
              <a className='text-link' href={project.vercel_link} target="_blank" rel="noopener noreferrer">
                <span className='link-title'>Vercel Link</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      <div className='comment-box'>
        <div className='show-comments'>
            <div className='show-hide-button-div'>
              <button className='show-hide-button' onClick={() => {
              setShowComments(!showComments) 
              console.log(project.comments[0])}}>
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
          </div>

          {showComments&& (
            <>
            <div className='add-comment'>
              <label>Show Some Love</label>
              <input 
              type="text"
              placeholder='Add a comment...'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)} 
              />
              <div className='button-holder'>
              <button className='submit-button' onClick={handleAddComment}>Submit</button>
              </div>
            </div>
            <div className='comments'>
              {project.comments.map((comment) => (
                <div key={comment._id} className='comment'>
                  <h5>{comment.user_id}</h5>
                  <p>{comment.text}</p>
                  <span>Posted: {formatDistanceToNow(new Date(comment.createdAt), {
                    includeSeconds: true,
                  })}{''} ago</span>
                </div>

              ))}
            </div>
            </>
          )}
          </div>
      </div>

    </div>

  )
}

export default SingleStudentProject