import { ProjectsContext } from "../context/ProjectContext";
import { useContext } from "react";

export const useProjectContext = () => {
    const context = useContext(ProjectsContext)

    if(!context) {
        throw Error('useProjectContext hook must be used insdie ProjectsContextProvider')
    }

    return context
}