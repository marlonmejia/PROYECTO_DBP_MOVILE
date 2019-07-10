from sqlalchemy import Column, Integer, String, Sequence, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import connector

class User(connector.Manager.Base):
    __tablename__ = 'users'
    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    name = Column(String(50))
    fullname = Column(String(50))
    password = Column(String(12))
    username = Column(String(12))

class Publish(connector.Manager.Base):
    __tablename__ = 'publish'
    id = Column(Integer, Sequence('publish_id_seq'), primary_key=True)
    title = Column(String(50))
    autor = Column(String(12))
    short_resume = Column(String(700))
    content = Column(String(1500))
    sent_on = Column(DateTime(timezone=True))
