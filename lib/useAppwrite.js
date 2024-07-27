import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native';
export const useAppwrite=(fn)=>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await fn();
            // console.log(res);
            setData(res);
        } catch (err) {
            Alert.alert('Error', 'Cannot fetch Data')
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const refetch=()=>{
        fetchData();
    }
    // console.log("Data:", data);
    return {data, refetch};
}
