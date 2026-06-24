import {AuthService} from "./authService"
import TasksService from "./tasksService";
import { UserService } from "./userService";
import { WorkspaceService } from "./workspaceService";

export const authService = new AuthService();
export const workspaceService = new WorkspaceService();
export const tasksService = new TasksService();
export const userService = new UserService();

