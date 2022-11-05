import { getMenuUserApi } from '../../../api';

export const GET_NAVIGATION = '[NAVIGATION] GET NAVIGATION';
export const SET_NAVIGATION = '[NAVIGATION] SET NAVIGATION';
export const RESET_NAVIGATION = '[NAVIGATION] RESET NAVIGATION';


export async function getNavigation(userId:any)
{
    try {
        const response = await getMenuUserApi(userId);
        if (response.status) {
            localStorage.setItem('navigation', JSON.stringify(response.data));
            return response.data;
            
        }
    } catch (error) {
        console.error(error)
    }  
}

export function getNavigationState()
{
    return {
        type: GET_NAVIGATION
    }
}

export function setNavigation(navigation:any)
{
    return {
        type: SET_NAVIGATION,
        navigation
    }
}

export function resetNavigation()
{
    return {
        type: RESET_NAVIGATION
    }
}
