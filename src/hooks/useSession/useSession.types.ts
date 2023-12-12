export interface UserData {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    app_metadata: {
        provider: string;
        providers: string[];
    };
    confirmed_at: string;
    created_at: string;
    identities: Identity[];
    last_sign_in_at: string;
    phone: string;
    updated_at: string;
    user_metadata: UserMetadata;
}

export interface Identity {
    created_at: string;
    id: string;
    identity_data: IdentityData;
    last_sign_in_at: string;
    provider: string;
    updated_at: string;
    user_id: string;
}

export interface IdentityData {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    picture: string;
    provider_id: string;
    sub: string;
}

export interface UserMetadata {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    picture: string;
    provider_id: string;
    sub: string;
}
