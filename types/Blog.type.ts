interface Blog {
    docId: string,
    id: string;
    title: string;
    text: string;
    imageUrl?: string;
    creatorUid: string,
    createdAt: string,
    lastUpdated: string,
    comments?: [
      {text: string;
      commenterUid: string;
      commenterFullName: string;
      userPhotoUrl: string;
      createdAt: string;
    }
    ]
  }

  interface BlogComment {
    
      text: string;
      commenterUid: string;
      commenterFullName: string | null | undefined;
      userPhotoUrl: string | null | undefined;
      createdAt: string;
   
  }