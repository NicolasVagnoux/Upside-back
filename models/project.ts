/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access*/
// import { ResultSetHeader } from "mysql2";
import connection from "../db-config";
import IProject from "../interfaces/IProject";

// GET all projects
const getAllProjects = async (): Promise<IProject[]> => {
    const results = await connection
    .query(`SELECT * FROM projects`);
    return results.rows;
};

// POST project
const addProject = async(project: IProject) : Promise<number> => {
    const results = await connection
    .query('INSERT INTO projects (nameProject, image, projectDesc, client, subsidiary, startDate, finalDate, progress, industryTag, color, projectManager) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id',
    [project.nameProject, project.image, project.projectDesc, project.client, project.subsidiary, project.startDate, project.finalDate, project.progress, project.industryTag, project.color, project.projectManager]);
    return results.rows[0].id;
};

// DELETE project
const deleteProject = async (idProject : number) : Promise<boolean> => {
    const results = await connection
    .query('DELETE FROM projects WHERE id = $1', [idProject]);
    return results.rowCount === 1;
  };

  export default { getAllProjects, addProject, deleteProject };