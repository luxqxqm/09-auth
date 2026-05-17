import { cookies } from "next/headers";
import { AxiosResponse } from "axios";
import { proxyServerApi } from "./api";

import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export const checkSession = async (): Promise<AxiosResponse> => {
  const cookieStore = await cookies();
  const res = await proxyServerApi.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export interface NoteHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search: string;
  tag?: string;
}
export async function fetchNotes({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<NoteHTTPResponse> {
  const cookieStore = await cookies();

  const res = await proxyServerApi.get<NoteHTTPResponse>("/notes", {
    params: { page, search, tag },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const res = await proxyServerApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();

  const res = await proxyServerApi.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}
