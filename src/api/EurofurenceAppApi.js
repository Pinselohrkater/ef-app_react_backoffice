import axios from 'axios';

class EurofurenceAppApi {

    // eslint-disable-next-line no-undef
    URL = __API_URL__;

    getAuthenticatedWebSocket() {
        return new WebSocket("ws://localhost:30001/ws");
    }


    getSync(since) {
        return axios.get(this.URL + "Sync?since=" + since);
    }

    getKnowledgeGroups(){
        return axios.get(this.URL + "KnowledgeGroups");
    }    
    getKnowledgeEntries(){
        return axios.get(this.URL + "KnowledgeEntries");
    }    
    getKnowledgeEntry(id){
        return axios.get(this.URL + "KnowledgeEntries/" + id);
    }    

    getFursuitBadges(token) {
        return axios.get(this.URL + "Fursuits/Badges", { headers: { Authorization: "Bearer " + token }});       
    }
    putKnowledgeEntry(token, item) {
        return axios.put(this.URL + "KnowledgeEntries/" + item.Id, item, { headers: { Authorization: "Bearer " + token }});
    }
    postKnowledgeEntry(token, item) {
        return axios.post(this.URL + "KnowledgeEntries/", item, { headers: { Authorization: "Bearer " + token }});
    }
    deleteKnowledgeEntry(token, id) {
        return axios.delete(this.URL + "KnowledgeEntries/" + id, { headers: { Authorization: "Bearer " + token }});
    }

    putKnowledgeGroup(token, item) {
        return axios.put(this.URL + "KnowledgeGroups/" + item.Id, item, { headers: { Authorization: "Bearer " + token }});
    }

    putImageContent(token, imageId, imageBytesBase64Encoded) {
        return axios.put(this.URL + "Images/" + imageId + "/Content", 
        JSON.stringify(imageBytesBase64Encoded)
        , { 
            headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }
        });
    }

    getImages(){
        return axios.get(this.URL + "Images");
    }    

    getPushNotificationChannelStatistics(token) {
        return axios.get(this.URL + "PushNotifications/Statistics", { headers: { Authorization: "Bearer " + token }});
    }

    login(dto) {
        return axios.post(this.URL + "Tokens/RegSys", dto);
    }

}

const instance = new EurofurenceAppApi();

export default instance;