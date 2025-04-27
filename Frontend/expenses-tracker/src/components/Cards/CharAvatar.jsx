import React from 'react'

const CharAvatar = ({fullName, width, height,style}) => {
  const getInitials = (name) => {
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };
  
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ""} flex items-center justify-center rounded-full text-gray-900  font-medium bg-gray-100 `}>
        {getInitials(fullName || "")}
    </div>
  )
}

export default CharAvatar
