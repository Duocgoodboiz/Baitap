// Thành viên trong team dự án
export interface TeamMember {
  memberId: number;
  name: string;
  role: string;
}

// Thông tin chi tiết dự án
export interface Project {
  projectId: number;
  title: string;
  isCompleted: boolean;
  startDate: Date;
  progress: number;
  teamMembers: TeamMember[];
  getProgress(): string;
}
