import { loginApi } from "../../../api";

export async function login(email:any,password:any)
{
    try {
        const response = await loginApi(email,password);
        if (response.status) {
            console.log(response.data);

            localStorage.setItem('dataUser', JSON.stringify(response.data));
            return response;
            
        }else{
            return response;
        }

    } catch (error) {
        console.error(error)
    }
    
        
    
}