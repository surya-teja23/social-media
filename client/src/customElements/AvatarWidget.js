import { Avatar } from '@mui/material'
import React from 'react'

export default function AvatarWidget( {alt,src} ) {
  return (
    <Avatar
      alt={alt}
      src={src}
      sx={{ width: "54px", height: "54px", "&:hover": { cursor: "pointer" } }}
    />
  );
}
