const formatDate=(date)=>{
    const fd=new Date(date).toLocaleDateString('en-us',{
      day:"numeric",
      month:"long",
      year:"numeric"
    })
    return fd;
  }

export default formatDate;