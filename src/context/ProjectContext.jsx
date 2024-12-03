import { createContext, useReducer } from 'react';

export const ProjectsContext = createContext()

export const projectsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                projects: action.payload
            }
            case 'CREATE_PROJECTS':
                return {
                    projects: [action.payload, ...state.projects]
                }
            case 'DELETE_PROJECTS':
                return {
                    projects: state.projects.filter((project) => project._id !== action.payload._id)
                }
            case 'UPDATE_PROJECT':{
                const updatedProject = action.payload;
                const updatedProjects = state.projects.map(project => {
                    if (project._id === updatedProject._id) {
                        return updatedProject;
                    }

                    return project;
                });

                return {
                    projects: updatedProjects
                }
            
            }

            default:
                return state
    }
}

export const ProjectsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(projectsReducer, {
        projects: null
    })


    return (
        <ProjectsContext.Provider value={({...state,dispatch})}>
            {children}
        </ProjectsContext.Provider>
    )
}