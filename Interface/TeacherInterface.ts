export interface Teacher {
  id: string;
  name: string;
  email?: string;
  profileImg?: string | null;
  avatar?: string | null;
}

export interface TeacherSummary {
  id: string;
  name: string;
  imgUrl?: string | null;
  profileImg?: string | null;
  avatar?: string | null;
}
