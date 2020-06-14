import { ProjectDetailsService } from './project-details.service';

describe('ProjectDetailsService', () => {
  let projectDetailService;

  beforeEach(() => {
    projectDetailService = new ProjectDetailsService();
  });

  it('should be created', () => {
    expect(projectDetailService).toBeTruthy();
  });

  it('should return project details', () => {
    const array = projectDetailService.projectDetails();

    expect(array.length).toBe(2);
  });

  it('should add data to project details', () => {
    projectDetailService.addProjectDetails('projectName', new Date());

    expect(projectDetailService.projectDetails().length).toBe(3);
  });

  it('should remove data from project details', () => {
    projectDetailService.deleteProjectDetails(1);

    expect(projectDetailService.projectDetails().length).toBe(1);
  });

  afterEach(() => {
    projectDetailService = null;
  });
});
