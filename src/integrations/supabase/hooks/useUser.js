import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### User

| name                | type                     | format | required |
|---------------------|--------------------------|--------|----------|
| id                  | integer                  | bigint | true     |
| created_at          | timestamp with time zone | string | true     |
| name                | text                     | string | false    |
| location            | text                     | string | false    |
| about               | text                     | string | false    |
| gender              | text                     | string | false    |
| profile_picture_url | text                     | string | false    |

Note: 
- id is the Primary Key.
- created_at has a default value of now().

No foreign key relationships are defined for this table.
*/

export const useUser = (id) => useQuery({
    queryKey: ['users', id],
    queryFn: () => fromSupabase(supabase.from('User').select('*').eq('id', id).single()),
});

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('User').select('*')),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('User').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('User').update(updateData).eq('id', id)),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['users', id] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('User').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};