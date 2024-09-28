import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const SearchResultItem = ({ profilePhoto, name, perfume, location }) => {
  return (
    <Card className="mb-4">
      <CardContent className="flex items-center p-4">
        <Avatar className="h-12 w-12 mr-4">
          <img src={profilePhoto} alt={name} className="rounded-full" />
        </Avatar>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{perfume}</p>
          <p className="text-xs text-gray-500">{location}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResultItem;