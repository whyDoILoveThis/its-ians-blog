interface Blog {
    docId: string,
    id: string;
    title: string;
    text: string;
    imageUrl?: string;
    creatorUid: string,
    createdAt: string,
    lastUpdated: string,
    comments?: BlogComment[],
  }

  interface BlogComment {
    
      text: string;
      commenterUid?: string | undefined;
      commenterFullName?: string | null | undefined;
      userPhotoUrl: string | null | undefined;
      createdAt: string;
   
  }