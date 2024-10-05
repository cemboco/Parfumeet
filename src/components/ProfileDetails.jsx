import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ProfileDetails = ({ profile, isEditing, handleChange }) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Über mich</h3>
      {isEditing ? (
        <Textarea
          name="about"
          value={profile.about}
          onChange={handleChange}
          className="w-full rounded-lg"
        />
      ) : (
        <p>{profile.about}</p>
      )}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Profil-Details</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="font-medium">Geschlecht:</p>
            {isEditing ? (
              <Input
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="rounded-full"
              />
            ) : (
              <p>{profile.gender}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;