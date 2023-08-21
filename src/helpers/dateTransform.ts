export const dateTransformer = (dateString: Date) =>{
    return new Date(dateString). toISOString()
}