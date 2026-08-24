export interface Room {
  id: number;
  slug: string;
  title: string;
  description: string;
  created_at: string;
}

export interface Message {
  id: number;
  handle: string;
  content: string;
  created_at: string;
  updated_at: string;
  off_topic_hidden: boolean;
  buried: boolean;
  bury: number;
  off_topic: number;
  reactions: {
    counts: {
        valid: number;
        props: number;
        yikes: number;
        sus: number;
        nope: number;
    };
    mine:
        | "valid"
        | "props"
        | "yikes"
        | "sus"
        | "nope"
        | null;
    };
}

export interface RoomDetail {
  handle: string;
  room: Room;
  discussion_date: string;
  messages: Message[];
  typing: string[];
}