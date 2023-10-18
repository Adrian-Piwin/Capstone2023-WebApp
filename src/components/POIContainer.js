import React, { useState, useEffect, useRef } from 'react';
import { apiURL } from "../constants";
import DBService from "../services/DBService";

export function POIContainer(){
    
    const dbService = new DBService(apiURL);
}